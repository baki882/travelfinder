package it.bbsoftware.travelfinder.service;

import it.bbsoftware.travelfinder.service.dto.AgenziaDTO;
import java.util.List;

/**
 * Service Interface for managing Agenzia.
 */
public interface AgenziaService {

    /**
     * Save a agenzia.
     *
     * @param agenziaDTO the entity to save
     * @return the persisted entity
     */
    AgenziaDTO save(AgenziaDTO agenziaDTO);

    /**
     * Get all the agenzias.
     *
     * @return the list of entities
     */
    List<AgenziaDTO> findAll();

    /**
     * Get the "id" agenzia.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AgenziaDTO findOne(Long id);

    /**
     * Delete the "id" agenzia.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
