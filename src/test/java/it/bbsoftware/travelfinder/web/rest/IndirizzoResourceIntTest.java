package it.bbsoftware.travelfinder.web.rest;

import it.bbsoftware.travelfinder.TravelfinderApp;

import it.bbsoftware.travelfinder.domain.Indirizzo;
import it.bbsoftware.travelfinder.repository.IndirizzoRepository;
import it.bbsoftware.travelfinder.service.IndirizzoService;
import it.bbsoftware.travelfinder.service.dto.IndirizzoDTO;
import it.bbsoftware.travelfinder.service.mapper.IndirizzoMapper;
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
 * Test class for the IndirizzoResource REST controller.
 *
 * @see IndirizzoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravelfinderApp.class)
public class IndirizzoResourceIntTest {

    private static final String DEFAULT_INDIRIZZO = "AAAAAAAAAA";
    private static final String UPDATED_INDIRIZZO = "BBBBBBBBBB";

    private static final String DEFAULT_CITTA = "AAAAAAAAAA";
    private static final String UPDATED_CITTA = "BBBBBBBBBB";

    private static final String DEFAULT_PROVINCIA = "AAAAAAAAAA";
    private static final String UPDATED_PROVINCIA = "BBBBBBBBBB";

    private static final String DEFAULT_CAP = "AAAAAAAAAA";
    private static final String UPDATED_CAP = "BBBBBBBBBB";

    private static final String DEFAULT_REGIONE = "AAAAAAAAAA";
    private static final String UPDATED_REGIONE = "BBBBBBBBBB";

    @Autowired
    private IndirizzoRepository indirizzoRepository;

    @Autowired
    private IndirizzoMapper indirizzoMapper;

    @Autowired
    private IndirizzoService indirizzoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIndirizzoMockMvc;

    private Indirizzo indirizzo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IndirizzoResource indirizzoResource = new IndirizzoResource(indirizzoService);
        this.restIndirizzoMockMvc = MockMvcBuilders.standaloneSetup(indirizzoResource)
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
    public static Indirizzo createEntity(EntityManager em) {
        Indirizzo indirizzo = new Indirizzo()
            .indirizzo(DEFAULT_INDIRIZZO)
            .citta(DEFAULT_CITTA)
            .provincia(DEFAULT_PROVINCIA)
            .cap(DEFAULT_CAP)
            .regione(DEFAULT_REGIONE);
        return indirizzo;
    }

    @Before
    public void initTest() {
        indirizzo = createEntity(em);
    }

    @Test
    @Transactional
    public void createIndirizzo() throws Exception {
        int databaseSizeBeforeCreate = indirizzoRepository.findAll().size();

        // Create the Indirizzo
        IndirizzoDTO indirizzoDTO = indirizzoMapper.toDto(indirizzo);
        restIndirizzoMockMvc.perform(post("/api/indirizzos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(indirizzoDTO)))
            .andExpect(status().isCreated());

        // Validate the Indirizzo in the database
        List<Indirizzo> indirizzoList = indirizzoRepository.findAll();
        assertThat(indirizzoList).hasSize(databaseSizeBeforeCreate + 1);
        Indirizzo testIndirizzo = indirizzoList.get(indirizzoList.size() - 1);
        assertThat(testIndirizzo.getIndirizzo()).isEqualTo(DEFAULT_INDIRIZZO);
        assertThat(testIndirizzo.getCitta()).isEqualTo(DEFAULT_CITTA);
        assertThat(testIndirizzo.getProvincia()).isEqualTo(DEFAULT_PROVINCIA);
        assertThat(testIndirizzo.getCap()).isEqualTo(DEFAULT_CAP);
        assertThat(testIndirizzo.getRegione()).isEqualTo(DEFAULT_REGIONE);
    }

    @Test
    @Transactional
    public void createIndirizzoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = indirizzoRepository.findAll().size();

        // Create the Indirizzo with an existing ID
        indirizzo.setId(1L);
        IndirizzoDTO indirizzoDTO = indirizzoMapper.toDto(indirizzo);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIndirizzoMockMvc.perform(post("/api/indirizzos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(indirizzoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Indirizzo in the database
        List<Indirizzo> indirizzoList = indirizzoRepository.findAll();
        assertThat(indirizzoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIndirizzos() throws Exception {
        // Initialize the database
        indirizzoRepository.saveAndFlush(indirizzo);

        // Get all the indirizzoList
        restIndirizzoMockMvc.perform(get("/api/indirizzos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(indirizzo.getId().intValue())))
            .andExpect(jsonPath("$.[*].indirizzo").value(hasItem(DEFAULT_INDIRIZZO.toString())))
            .andExpect(jsonPath("$.[*].citta").value(hasItem(DEFAULT_CITTA.toString())))
            .andExpect(jsonPath("$.[*].provincia").value(hasItem(DEFAULT_PROVINCIA.toString())))
            .andExpect(jsonPath("$.[*].cap").value(hasItem(DEFAULT_CAP.toString())))
            .andExpect(jsonPath("$.[*].regione").value(hasItem(DEFAULT_REGIONE.toString())));
    }

    @Test
    @Transactional
    public void getIndirizzo() throws Exception {
        // Initialize the database
        indirizzoRepository.saveAndFlush(indirizzo);

        // Get the indirizzo
        restIndirizzoMockMvc.perform(get("/api/indirizzos/{id}", indirizzo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(indirizzo.getId().intValue()))
            .andExpect(jsonPath("$.indirizzo").value(DEFAULT_INDIRIZZO.toString()))
            .andExpect(jsonPath("$.citta").value(DEFAULT_CITTA.toString()))
            .andExpect(jsonPath("$.provincia").value(DEFAULT_PROVINCIA.toString()))
            .andExpect(jsonPath("$.cap").value(DEFAULT_CAP.toString()))
            .andExpect(jsonPath("$.regione").value(DEFAULT_REGIONE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIndirizzo() throws Exception {
        // Get the indirizzo
        restIndirizzoMockMvc.perform(get("/api/indirizzos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIndirizzo() throws Exception {
        // Initialize the database
        indirizzoRepository.saveAndFlush(indirizzo);
        int databaseSizeBeforeUpdate = indirizzoRepository.findAll().size();

        // Update the indirizzo
        Indirizzo updatedIndirizzo = indirizzoRepository.findOne(indirizzo.getId());
        // Disconnect from session so that the updates on updatedIndirizzo are not directly saved in db
        em.detach(updatedIndirizzo);
        updatedIndirizzo
            .indirizzo(UPDATED_INDIRIZZO)
            .citta(UPDATED_CITTA)
            .provincia(UPDATED_PROVINCIA)
            .cap(UPDATED_CAP)
            .regione(UPDATED_REGIONE);
        IndirizzoDTO indirizzoDTO = indirizzoMapper.toDto(updatedIndirizzo);

        restIndirizzoMockMvc.perform(put("/api/indirizzos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(indirizzoDTO)))
            .andExpect(status().isOk());

        // Validate the Indirizzo in the database
        List<Indirizzo> indirizzoList = indirizzoRepository.findAll();
        assertThat(indirizzoList).hasSize(databaseSizeBeforeUpdate);
        Indirizzo testIndirizzo = indirizzoList.get(indirizzoList.size() - 1);
        assertThat(testIndirizzo.getIndirizzo()).isEqualTo(UPDATED_INDIRIZZO);
        assertThat(testIndirizzo.getCitta()).isEqualTo(UPDATED_CITTA);
        assertThat(testIndirizzo.getProvincia()).isEqualTo(UPDATED_PROVINCIA);
        assertThat(testIndirizzo.getCap()).isEqualTo(UPDATED_CAP);
        assertThat(testIndirizzo.getRegione()).isEqualTo(UPDATED_REGIONE);
    }

    @Test
    @Transactional
    public void updateNonExistingIndirizzo() throws Exception {
        int databaseSizeBeforeUpdate = indirizzoRepository.findAll().size();

        // Create the Indirizzo
        IndirizzoDTO indirizzoDTO = indirizzoMapper.toDto(indirizzo);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIndirizzoMockMvc.perform(put("/api/indirizzos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(indirizzoDTO)))
            .andExpect(status().isCreated());

        // Validate the Indirizzo in the database
        List<Indirizzo> indirizzoList = indirizzoRepository.findAll();
        assertThat(indirizzoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIndirizzo() throws Exception {
        // Initialize the database
        indirizzoRepository.saveAndFlush(indirizzo);
        int databaseSizeBeforeDelete = indirizzoRepository.findAll().size();

        // Get the indirizzo
        restIndirizzoMockMvc.perform(delete("/api/indirizzos/{id}", indirizzo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Indirizzo> indirizzoList = indirizzoRepository.findAll();
        assertThat(indirizzoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Indirizzo.class);
        Indirizzo indirizzo1 = new Indirizzo();
        indirizzo1.setId(1L);
        Indirizzo indirizzo2 = new Indirizzo();
        indirizzo2.setId(indirizzo1.getId());
        assertThat(indirizzo1).isEqualTo(indirizzo2);
        indirizzo2.setId(2L);
        assertThat(indirizzo1).isNotEqualTo(indirizzo2);
        indirizzo1.setId(null);
        assertThat(indirizzo1).isNotEqualTo(indirizzo2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(IndirizzoDTO.class);
        IndirizzoDTO indirizzoDTO1 = new IndirizzoDTO();
        indirizzoDTO1.setId(1L);
        IndirizzoDTO indirizzoDTO2 = new IndirizzoDTO();
        assertThat(indirizzoDTO1).isNotEqualTo(indirizzoDTO2);
        indirizzoDTO2.setId(indirizzoDTO1.getId());
        assertThat(indirizzoDTO1).isEqualTo(indirizzoDTO2);
        indirizzoDTO2.setId(2L);
        assertThat(indirizzoDTO1).isNotEqualTo(indirizzoDTO2);
        indirizzoDTO1.setId(null);
        assertThat(indirizzoDTO1).isNotEqualTo(indirizzoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(indirizzoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(indirizzoMapper.fromId(null)).isNull();
    }
}
