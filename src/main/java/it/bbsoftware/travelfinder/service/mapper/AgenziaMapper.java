package it.bbsoftware.travelfinder.service.mapper;

import it.bbsoftware.travelfinder.domain.*;
import it.bbsoftware.travelfinder.service.dto.AgenziaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Agenzia and its DTO AgenziaDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AgenziaMapper extends EntityMapper<AgenziaDTO, Agenzia> {


    @Mapping(target = "sedes", ignore = true)
    Agenzia toEntity(AgenziaDTO agenziaDTO);

    default Agenzia fromId(Long id) {
        if (id == null) {
            return null;
        }
        Agenzia agenzia = new Agenzia();
        agenzia.setId(id);
        return agenzia;
    }
}
