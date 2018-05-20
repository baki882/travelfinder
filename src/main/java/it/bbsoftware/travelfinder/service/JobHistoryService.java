package it.bbsoftware.travelfinder.service;

import it.bbsoftware.travelfinder.service.dto.JobHistoryDTO;
import java.util.List;

/**
 * Service Interface for managing JobHistory.
 */
public interface JobHistoryService {

    /**
     * Save a jobHistory.
     *
     * @param jobHistoryDTO the entity to save
     * @return the persisted entity
     */
    JobHistoryDTO save(JobHistoryDTO jobHistoryDTO);

    /**
     * Get all the jobHistories.
     *
     * @return the list of entities
     */
    List<JobHistoryDTO> findAll();

    /**
     * Get the "id" jobHistory.
     *
     * @param id the id of the entity
     * @return the entity
     */
    JobHistoryDTO findOne(Long id);

    /**
     * Delete the "id" jobHistory.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
