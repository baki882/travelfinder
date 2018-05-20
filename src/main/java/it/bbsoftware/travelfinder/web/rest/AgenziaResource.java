package it.bbsoftware.travelfinder.web.rest;

import com.codahale.metrics.annotation.Timed;
import it.bbsoftware.travelfinder.service.AgenziaService;
import it.bbsoftware.travelfinder.web.rest.errors.BadRequestAlertException;
import it.bbsoftware.travelfinder.web.rest.util.HeaderUtil;
import it.bbsoftware.travelfinder.service.dto.AgenziaDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Agenzia.
 */
@RestController
@RequestMapping("/api")
public class AgenziaResource {

    private final Logger log = LoggerFactory.getLogger(AgenziaResource.class);

    private static final String ENTITY_NAME = "agenzia";

    private final AgenziaService agenziaService;

    public AgenziaResource(AgenziaService agenziaService) {
        this.agenziaService = agenziaService;
    }

    /**
     * POST  /agenzias : Create a new agenzia.
     *
     * @param agenziaDTO the agenziaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new agenziaDTO, or with status 400 (Bad Request) if the agenzia has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/agenzias")
    @Timed
    public ResponseEntity<AgenziaDTO> createAgenzia(@RequestBody AgenziaDTO agenziaDTO) throws URISyntaxException {
        log.debug("REST request to save Agenzia : {}", agenziaDTO);
        if (agenziaDTO.getId() != null) {
            throw new BadRequestAlertException("A new agenzia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AgenziaDTO result = agenziaService.save(agenziaDTO);
        return ResponseEntity.created(new URI("/api/agenzias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /agenzias : Updates an existing agenzia.
     *
     * @param agenziaDTO the agenziaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated agenziaDTO,
     * or with status 400 (Bad Request) if the agenziaDTO is not valid,
     * or with status 500 (Internal Server Error) if the agenziaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/agenzias")
    @Timed
    public ResponseEntity<AgenziaDTO> updateAgenzia(@RequestBody AgenziaDTO agenziaDTO) throws URISyntaxException {
        log.debug("REST request to update Agenzia : {}", agenziaDTO);
        if (agenziaDTO.getId() == null) {
            return createAgenzia(agenziaDTO);
        }
        AgenziaDTO result = agenziaService.save(agenziaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, agenziaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /agenzias : get all the agenzias.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of agenzias in body
     */
    @GetMapping("/agenzias")
    @Timed
    public List<AgenziaDTO> getAllAgenzias() {
        log.debug("REST request to get all Agenzias");
        return agenziaService.findAll();
        }

    /**
     * GET  /agenzias/:id : get the "id" agenzia.
     *
     * @param id the id of the agenziaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the agenziaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/agenzias/{id}")
    @Timed
    public ResponseEntity<AgenziaDTO> getAgenzia(@PathVariable Long id) {
        log.debug("REST request to get Agenzia : {}", id);
        AgenziaDTO agenziaDTO = agenziaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(agenziaDTO));
    }

    /**
     * DELETE  /agenzias/:id : delete the "id" agenzia.
     *
     * @param id the id of the agenziaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/agenzias/{id}")
    @Timed
    public ResponseEntity<Void> deleteAgenzia(@PathVariable Long id) {
        log.debug("REST request to delete Agenzia : {}", id);
        agenziaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
