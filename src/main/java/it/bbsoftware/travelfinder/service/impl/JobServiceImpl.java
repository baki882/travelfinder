package it.bbsoftware.travelfinder.service.impl;

import it.bbsoftware.travelfinder.service.JobService;
import it.bbsoftware.travelfinder.domain.Job;
import it.bbsoftware.travelfinder.repository.JobRepository;
import it.bbsoftware.travelfinder.service.dto.JobDTO;
import it.bbsoftware.travelfinder.service.mapper.JobMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Job.
 */
@Service
@Transactional
public class JobServiceImpl implements JobService {

    private final Logger log = LoggerFactory.getLogger(JobServiceImpl.class);

    private final JobRepository jobRepository;

    private final JobMapper jobMapper;

    public JobServiceImpl(JobRepository jobRepository, JobMapper jobMapper) {
        this.jobRepository = jobRepository;
        this.jobMapper = jobMapper;
    }

    /**
     * Save a job.
     *
     * @param jobDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public JobDTO save(JobDTO jobDTO) {
        log.debug("Request to save Job : {}", jobDTO);
        Job job = jobMapper.toEntity(jobDTO);
        job = jobRepository.save(job);
        return jobMapper.toDto(job);
    }

    /**
     * Get all the jobs.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<JobDTO> findAll() {
        log.debug("Request to get all Jobs");
        return jobRepository.findAll().stream()
            .map(jobMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one job by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public JobDTO findOne(Long id) {
        log.debug("Request to get Job : {}", id);
        Job job = jobRepository.findOne(id);
        return jobMapper.toDto(job);
    }

    /**
     * Delete the job by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Job : {}", id);
        jobRepository.delete(id);
    }
}
