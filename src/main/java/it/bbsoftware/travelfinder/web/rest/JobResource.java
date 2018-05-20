package it.bbsoftware.travelfinder.web.rest;

import com.codahale.metrics.annotation.Timed;
import it.bbsoftware.travelfinder.service.JobService;
import it.bbsoftware.travelfinder.web.rest.errors.BadRequestAlertException;
import it.bbsoftware.travelfinder.web.rest.util.HeaderUtil;
import it.bbsoftware.travelfinder.service.dto.JobDTO;
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
 * REST controller for managing Job.
 */
@RestController
@RequestMapping("/api")
public class JobResource {

    private final Logger log = LoggerFactory.getLogger(JobResource.class);

    private static final String ENTITY_NAME = "job";

    private final JobService jobService;

    public JobResource(JobService jobService) {
        this.jobService = jobService;
    }

    /**
     * POST  /jobs : Create a new job.
     *
     * @param jobDTO the jobDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jobDTO, or with status 400 (Bad Request) if the job has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/jobs")
    @Timed
    public ResponseEntity<JobDTO> createJob(@RequestBody JobDTO jobDTO) throws URISyntaxException {
        log.debug("REST request to save Job : {}", jobDTO);
        if (jobDTO.getId() != null) {
            throw new BadRequestAlertException("A new job cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JobDTO result = jobService.save(jobDTO);
        return ResponseEntity.created(new URI("/api/jobs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /jobs : Updates an existing job.
     *
     * @param jobDTO the jobDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jobDTO,
     * or with status 400 (Bad Request) if the jobDTO is not valid,
     * or with status 500 (Internal Server Error) if the jobDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/jobs")
    @Timed
    public ResponseEntity<JobDTO> updateJob(@RequestBody JobDTO jobDTO) throws URISyntaxException {
        log.debug("REST request to update Job : {}", jobDTO);
        if (jobDTO.getId() == null) {
            return createJob(jobDTO);
        }
        JobDTO result = jobService.save(jobDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jobDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /jobs : get all the jobs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of jobs in body
     */
    @GetMapping("/jobs")
    @Timed
    public List<JobDTO> getAllJobs() {
        log.debug("REST request to get all Jobs");
        return jobService.findAll();
        }

    /**
     * GET  /jobs/:id : get the "id" job.
     *
     * @param id the id of the jobDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jobDTO, or with status 404 (Not Found)
     */
    @GetMapping("/jobs/{id}")
    @Timed
    public ResponseEntity<JobDTO> getJob(@PathVariable Long id) {
        log.debug("REST request to get Job : {}", id);
        JobDTO jobDTO = jobService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(jobDTO));
    }

    /**
     * DELETE  /jobs/:id : delete the "id" job.
     *
     * @param id the id of the jobDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/jobs/{id}")
    @Timed
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        log.debug("REST request to delete Job : {}", id);
        jobService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
