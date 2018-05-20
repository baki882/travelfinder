package it.bbsoftware.travelfinder.service;

import it.bbsoftware.travelfinder.service.dto.IndirizzoDTO;
import java.util.List;

/**
 * Service Interface for managing Indirizzo.
 */
public interface IndirizzoService {

    /**
     * Save a indirizzo.
     *
     * @param indirizzoDTO the entity to save
     * @return the persisted entity
     */
    IndirizzoDTO save(IndirizzoDTO indirizzoDTO);

    /**
     * Get all the indirizzos.
     *
     * @return the list of entities
     */
    List<IndirizzoDTO> findAll();

    /**
     * Get the "id" indirizzo.
     *
     * @param id the id of the entity
     * @return the entity
     */
    IndirizzoDTO findOne(Long id);

    /**
     * Delete the "id" indirizzo.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
