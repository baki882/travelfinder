package it.bbsoftware.travelfinder.service.impl;

import it.bbsoftware.travelfinder.service.IndirizzoService;
import it.bbsoftware.travelfinder.domain.Indirizzo;
import it.bbsoftware.travelfinder.repository.IndirizzoRepository;
import it.bbsoftware.travelfinder.service.dto.IndirizzoDTO;
import it.bbsoftware.travelfinder.service.mapper.IndirizzoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Indirizzo.
 */
@Service
@Transactional
public class IndirizzoServiceImpl implements IndirizzoService {

    private final Logger log = LoggerFactory.getLogger(IndirizzoServiceImpl.class);

    private final IndirizzoRepository indirizzoRepository;

    private final IndirizzoMapper indirizzoMapper;

    public IndirizzoServiceImpl(IndirizzoRepository indirizzoRepository, IndirizzoMapper indirizzoMapper) {
        this.indirizzoRepository = indirizzoRepository;
        this.indirizzoMapper = indirizzoMapper;
    }

    /**
     * Save a indirizzo.
     *
     * @param indirizzoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public IndirizzoDTO save(IndirizzoDTO indirizzoDTO) {
        log.debug("Request to save Indirizzo : {}", indirizzoDTO);
        Indirizzo indirizzo = indirizzoMapper.toEntity(indirizzoDTO);
        indirizzo = indirizzoRepository.save(indirizzo);
        return indirizzoMapper.toDto(indirizzo);
    }

    /**
     * Get all the indirizzos.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<IndirizzoDTO> findAll() {
        log.debug("Request to get all Indirizzos");
        return indirizzoRepository.findAll().stream()
            .map(indirizzoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one indirizzo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public IndirizzoDTO findOne(Long id) {
        log.debug("Request to get Indirizzo : {}", id);
        Indirizzo indirizzo = indirizzoRepository.findOne(id);
        return indirizzoMapper.toDto(indirizzo);
    }

    /**
     * Delete the indirizzo by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Indirizzo : {}", id);
        indirizzoRepository.delete(id);
    }
}
