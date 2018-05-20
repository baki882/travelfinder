package it.bbsoftware.travelfinder.service.mapper;

import it.bbsoftware.travelfinder.domain.*;
import it.bbsoftware.travelfinder.service.dto.IndirizzoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Indirizzo and its DTO IndirizzoDTO.
 */
@Mapper(componentModel = "spring", uses = {AgenziaMapper.class})
public interface IndirizzoMapper extends EntityMapper<IndirizzoDTO, Indirizzo> {

    @Mapping(source = "agenzia.id", target = "agenziaId")
    IndirizzoDTO toDto(Indirizzo indirizzo);

    @Mapping(source = "agenziaId", target = "agenzia")
    Indirizzo toEntity(IndirizzoDTO indirizzoDTO);

    default Indirizzo fromId(Long id) {
        if (id == null) {
            return null;
        }
        Indirizzo indirizzo = new Indirizzo();
        indirizzo.setId(id);
        return indirizzo;
    }
}
