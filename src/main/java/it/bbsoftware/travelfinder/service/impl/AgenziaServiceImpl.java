package it.bbsoftware.travelfinder.service.impl;

import it.bbsoftware.travelfinder.service.AgenziaService;
import it.bbsoftware.travelfinder.domain.Agenzia;
import it.bbsoftware.travelfinder.repository.AgenziaRepository;
import it.bbsoftware.travelfinder.service.dto.AgenziaDTO;
import it.bbsoftware.travelfinder.service.mapper.AgenziaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Agenzia.
 */
@Service
@Transactional
public class AgenziaServiceImpl implements AgenziaService {

    private final Logger log = LoggerFactory.getLogger(AgenziaServiceImpl.class);

    private final AgenziaRepository agenziaRepository;

    private final AgenziaMapper agenziaMapper;

    public AgenziaServiceImpl(AgenziaRepository agenziaRepository, AgenziaMapper agenziaMapper) {
        this.agenziaRepository = agenziaRepository;
        this.agenziaMapper = agenziaMapper;
    }

    /**
     * Save a agenzia.
     *
     * @param agenziaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AgenziaDTO save(AgenziaDTO agenziaDTO) {
        log.debug("Request to save Agenzia : {}", agenziaDTO);
        Agenzia agenzia = agenziaMapper.toEntity(agenziaDTO);
        agenzia = agenziaRepository.save(agenzia);
        return agenziaMapper.toDto(agenzia);
    }

    /**
     * Get all the agenzias.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AgenziaDTO> findAll() {
        log.debug("Request to get all Agenzias");
        return agenziaRepository.findAll().stream()
            .map(agenziaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one agenzia by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AgenziaDTO findOne(Long id) {
        log.debug("Request to get Agenzia : {}", id);
        Agenzia agenzia = agenziaRepository.findOne(id);
        return agenziaMapper.toDto(agenzia);
    }

    /**
     * Delete the agenzia by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Agenzia : {}", id);
        agenziaRepository.delete(id);
    }
}
