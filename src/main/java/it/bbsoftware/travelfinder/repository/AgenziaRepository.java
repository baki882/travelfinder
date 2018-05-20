package it.bbsoftware.travelfinder.repository;

import it.bbsoftware.travelfinder.domain.Agenzia;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Agenzia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgenziaRepository extends JpaRepository<Agenzia, Long> {

}
