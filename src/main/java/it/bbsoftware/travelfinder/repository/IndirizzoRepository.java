package it.bbsoftware.travelfinder.repository;

import it.bbsoftware.travelfinder.domain.Indirizzo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Indirizzo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IndirizzoRepository extends JpaRepository<Indirizzo, Long> {

}
