package it.bbsoftware.travelfinder.service.mapper;

import it.bbsoftware.travelfinder.domain.*;
import it.bbsoftware.travelfinder.service.dto.JobHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity JobHistory and its DTO JobHistoryDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface JobHistoryMapper extends EntityMapper<JobHistoryDTO, JobHistory> {



    default JobHistory fromId(Long id) {
        if (id == null) {
            return null;
        }
        JobHistory jobHistory = new JobHistory();
        jobHistory.setId(id);
        return jobHistory;
    }
}
