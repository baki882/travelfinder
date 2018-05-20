package it.bbsoftware.travelfinder.web.rest;

import com.codahale.metrics.annotation.Timed;
import it.bbsoftware.travelfinder.service.IndirizzoService;
import it.bbsoftware.travelfinder.web.rest.errors.BadRequestAlertException;
import it.bbsoftware.travelfinder.web.rest.util.HeaderUtil;
import it.bbsoftware.travelfinder.service.dto.IndirizzoDTO;
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
 * REST controller for managing Indirizzo.
 */
@RestController
@RequestMapping("/api")
public class IndirizzoResource {

    private final Logger log = LoggerFactory.getLogger(IndirizzoResource.class);

    private static final String ENTITY_NAME = "indirizzo";

    private final IndirizzoService indirizzoService;

    public IndirizzoResource(IndirizzoService indirizzoService) {
        this.indirizzoService = indirizzoService;
    }

    /**
     * POST  /indirizzos : Create a new indirizzo.
     *
     * @param indirizzoDTO the indirizzoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new indirizzoDTO, or with status 400 (Bad Request) if the indirizzo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/indirizzos")
    @Timed
    public ResponseEntity<IndirizzoDTO> createIndirizzo(@RequestBody IndirizzoDTO indirizzoDTO) throws URISyntaxException {
        log.debug("REST request to save Indirizzo : {}", indirizzoDTO);
        if (indirizzoDTO.getId() != null) {
            throw new BadRequestAlertException("A new indirizzo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IndirizzoDTO result = indirizzoService.save(indirizzoDTO);
        return ResponseEntity.created(new URI("/api/indirizzos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /indirizzos : Updates an existing indirizzo.
     *
     * @param indirizzoDTO the indirizzoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated indirizzoDTO,
     * or with status 400 (Bad Request) if the indirizzoDTO is not valid,
     * or with status 500 (Internal Server Error) if the indirizzoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/indirizzos")
    @Timed
    public ResponseEntity<IndirizzoDTO> updateIndirizzo(@RequestBody IndirizzoDTO indirizzoDTO) throws URISyntaxException {
        log.debug("REST request to update Indirizzo : {}", indirizzoDTO);
        if (indirizzoDTO.getId() == null) {
            return createIndirizzo(indirizzoDTO);
        }
        IndirizzoDTO result = indirizzoService.save(indirizzoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, indirizzoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /indirizzos : get all the indirizzos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of indirizzos in body
     */
    @GetMapping("/indirizzos")
    @Timed
    public List<IndirizzoDTO> getAllIndirizzos() {
        log.debug("REST request to get all Indirizzos");
        return indirizzoService.findAll();
        }

    /**
     * GET  /indirizzos/:id : get the "id" indirizzo.
     *
     * @param id the id of the indirizzoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the indirizzoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/indirizzos/{id}")
    @Timed
    public ResponseEntity<IndirizzoDTO> getIndirizzo(@PathVariable Long id) {
        log.debug("REST request to get Indirizzo : {}", id);
        IndirizzoDTO indirizzoDTO = indirizzoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(indirizzoDTO));
    }

    /**
     * DELETE  /indirizzos/:id : delete the "id" indirizzo.
     *
     * @param id the id of the indirizzoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/indirizzos/{id}")
    @Timed
    public ResponseEntity<Void> deleteIndirizzo(@PathVariable Long id) {
        log.debug("REST request to delete Indirizzo : {}", id);
        indirizzoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
