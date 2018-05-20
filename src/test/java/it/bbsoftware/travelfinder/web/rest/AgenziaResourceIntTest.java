package it.bbsoftware.travelfinder.web.rest;

import it.bbsoftware.travelfinder.TravelfinderApp;

import it.bbsoftware.travelfinder.domain.Agenzia;
import it.bbsoftware.travelfinder.repository.AgenziaRepository;
import it.bbsoftware.travelfinder.service.AgenziaService;
import it.bbsoftware.travelfinder.service.dto.AgenziaDTO;
import it.bbsoftware.travelfinder.service.mapper.AgenziaMapper;
import it.bbsoftware.travelfinder.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static it.bbsoftware.travelfinder.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AgenziaResource REST controller.
 *
 * @see AgenziaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravelfinderApp.class)
public class AgenziaResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private AgenziaRepository agenziaRepository;

    @Autowired
    private AgenziaMapper agenziaMapper;

    @Autowired
    private AgenziaService agenziaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAgenziaMockMvc;

    private Agenzia agenzia;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AgenziaResource agenziaResource = new AgenziaResource(agenziaService);
        this.restAgenziaMockMvc = MockMvcBuilders.standaloneSetup(agenziaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Agenzia createEntity(EntityManager em) {
        Agenzia agenzia = new Agenzia()
            .nome(DEFAULT_NOME);
        return agenzia;
    }

    @Before
    public void initTest() {
        agenzia = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgenzia() throws Exception {
        int databaseSizeBeforeCreate = agenziaRepository.findAll().size();

        // Create the Agenzia
        AgenziaDTO agenziaDTO = agenziaMapper.toDto(agenzia);
        restAgenziaMockMvc.perform(post("/api/agenzias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agenziaDTO)))
            .andExpect(status().isCreated());

        // Validate the Agenzia in the database
        List<Agenzia> agenziaList = agenziaRepository.findAll();
        assertThat(agenziaList).hasSize(databaseSizeBeforeCreate + 1);
        Agenzia testAgenzia = agenziaList.get(agenziaList.size() - 1);
        assertThat(testAgenzia.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createAgenziaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agenziaRepository.findAll().size();

        // Create the Agenzia with an existing ID
        agenzia.setId(1L);
        AgenziaDTO agenziaDTO = agenziaMapper.toDto(agenzia);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgenziaMockMvc.perform(post("/api/agenzias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agenziaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Agenzia in the database
        List<Agenzia> agenziaList = agenziaRepository.findAll();
        assertThat(agenziaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAgenzias() throws Exception {
        // Initialize the database
        agenziaRepository.saveAndFlush(agenzia);

        // Get all the agenziaList
        restAgenziaMockMvc.perform(get("/api/agenzias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agenzia.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())));
    }

    @Test
    @Transactional
    public void getAgenzia() throws Exception {
        // Initialize the database
        agenziaRepository.saveAndFlush(agenzia);

        // Get the agenzia
        restAgenziaMockMvc.perform(get("/api/agenzias/{id}", agenzia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(agenzia.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAgenzia() throws Exception {
        // Get the agenzia
        restAgenziaMockMvc.perform(get("/api/agenzias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgenzia() throws Exception {
        // Initialize the database
        agenziaRepository.saveAndFlush(agenzia);
        int databaseSizeBeforeUpdate = agenziaRepository.findAll().size();

        // Update the agenzia
        Agenzia updatedAgenzia = agenziaRepository.findOne(agenzia.getId());
        // Disconnect from session so that the updates on updatedAgenzia are not directly saved in db
        em.detach(updatedAgenzia);
        updatedAgenzia
            .nome(UPDATED_NOME);
        AgenziaDTO agenziaDTO = agenziaMapper.toDto(updatedAgenzia);

        restAgenziaMockMvc.perform(put("/api/agenzias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agenziaDTO)))
            .andExpect(status().isOk());

        // Validate the Agenzia in the database
        List<Agenzia> agenziaList = agenziaRepository.findAll();
        assertThat(agenziaList).hasSize(databaseSizeBeforeUpdate);
        Agenzia testAgenzia = agenziaList.get(agenziaList.size() - 1);
        assertThat(testAgenzia.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingAgenzia() throws Exception {
        int databaseSizeBeforeUpdate = agenziaRepository.findAll().size();

        // Create the Agenzia
        AgenziaDTO agenziaDTO = agenziaMapper.toDto(agenzia);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAgenziaMockMvc.perform(put("/api/agenzias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agenziaDTO)))
            .andExpect(status().isCreated());

        // Validate the Agenzia in the database
        List<Agenzia> agenziaList = agenziaRepository.findAll();
        assertThat(agenziaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAgenzia() throws Exception {
        // Initialize the database
        agenziaRepository.saveAndFlush(agenzia);
        int databaseSizeBeforeDelete = agenziaRepository.findAll().size();

        // Get the agenzia
        restAgenziaMockMvc.perform(delete("/api/agenzias/{id}", agenzia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Agenzia> agenziaList = agenziaRepository.findAll();
        assertThat(agenziaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Agenzia.class);
        Agenzia agenzia1 = new Agenzia();
        agenzia1.setId(1L);
        Agenzia agenzia2 = new Agenzia();
        agenzia2.setId(agenzia1.getId());
        assertThat(agenzia1).isEqualTo(agenzia2);
        agenzia2.setId(2L);
        assertThat(agenzia1).isNotEqualTo(agenzia2);
        agenzia1.setId(null);
        assertThat(agenzia1).isNotEqualTo(agenzia2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AgenziaDTO.class);
        AgenziaDTO agenziaDTO1 = new AgenziaDTO();
        agenziaDTO1.setId(1L);
        AgenziaDTO agenziaDTO2 = new AgenziaDTO();
        assertThat(agenziaDTO1).isNotEqualTo(agenziaDTO2);
        agenziaDTO2.setId(agenziaDTO1.getId());
        assertThat(agenziaDTO1).isEqualTo(agenziaDTO2);
        agenziaDTO2.setId(2L);
        assertThat(agenziaDTO1).isNotEqualTo(agenziaDTO2);
        agenziaDTO1.setId(null);
        assertThat(agenziaDTO1).isNotEqualTo(agenziaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(agenziaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(agenziaMapper.fromId(null)).isNull();
    }
}
