package it.bbsoftware.travelfinder.service.impl;

import it.bbsoftware.travelfinder.service.JobHistoryService;
import it.bbsoftware.travelfinder.domain.JobHistory;
import it.bbsoftware.travelfinder.repository.JobHistoryRepository;
import it.bbsoftware.travelfinder.service.dto.JobHistoryDTO;
import it.bbsoftware.travelfinder.service.mapper.JobHistoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing JobHistory.
 */
@Service
@Transactional
public class JobHistoryServiceImpl implements JobHistoryService {

    private final Logger log = LoggerFactory.getLogger(JobHistoryServiceImpl.class);

    private final JobHistoryRepository jobHistoryRepository;

    private final JobHistoryMapper jobHistoryMapper;

    public JobHistoryServiceImpl(JobHistoryRepository jobHistoryRepository, JobHistoryMapper jobHistoryMapper) {
        this.jobHistoryRepository = jobHistoryRepository;
        this.jobHistoryMapper = jobHistoryMapper;
    }

    /**
     * Save a jobHistory.
     *
     * @param jobHistoryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public JobHistoryDTO save(JobHistoryDTO jobHistoryDTO) {
        log.debug("Request to save JobHistory : {}", jobHistoryDTO);
        JobHistory jobHistory = jobHistoryMapper.toEntity(jobHistoryDTO);
        jobHistory = jobHistoryRepository.save(jobHistory);
        return jobHistoryMapper.toDto(jobHistory);
    }

    /**
     * Get all the jobHistories.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<JobHistoryDTO> findAll() {
        log.debug("Request to get all JobHistories");
        return jobHistoryRepository.findAll().stream()
            .map(jobHistoryMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one jobHistory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public JobHistoryDTO findOne(Long id) {
        log.debug("Request to get JobHistory : {}", id);
        JobHistory jobHistory = jobHistoryRepository.findOne(id);
        return jobHistoryMapper.toDto(jobHistory);
    }

    /**
     * Delete the jobHistory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete JobHistory : {}", id);
        jobHistoryRepository.delete(id);
    }
}
