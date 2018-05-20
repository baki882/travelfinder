package it.bbsoftware.travelfinder.service.mapper;

import it.bbsoftware.travelfinder.domain.*;
import it.bbsoftware.travelfinder.service.dto.TaskDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Task and its DTO TaskDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TaskMapper extends EntityMapper<TaskDTO, Task> {



    default Task fromId(Long id) {
        if (id == null) {
            return null;
        }
        Task task = new Task();
        task.setId(id);
        return task;
    }
}
