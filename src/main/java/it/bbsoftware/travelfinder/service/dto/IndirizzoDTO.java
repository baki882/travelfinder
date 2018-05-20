package it.bbsoftware.travelfinder.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Indirizzo entity.
 */
public class IndirizzoDTO implements Serializable {

    private Long id;

    private String indirizzo;

    private String citta;

    private String provincia;

    private String cap;

    private String regione;

    private Long agenziaId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIndirizzo() {
        return indirizzo;
    }

    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }

    public String getCitta() {
        return citta;
    }

    public void setCitta(String citta) {
        this.citta = citta;
    }

    public String getProvincia() {
        return provincia;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getCap() {
        return cap;
    }

    public void setCap(String cap) {
        this.cap = cap;
    }

    public String getRegione() {
        return regione;
    }

    public void setRegione(String regione) {
        this.regione = regione;
    }

    public Long getAgenziaId() {
        return agenziaId;
    }

    public void setAgenziaId(Long agenziaId) {
        this.agenziaId = agenziaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        IndirizzoDTO indirizzoDTO = (IndirizzoDTO) o;
        if(indirizzoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), indirizzoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IndirizzoDTO{" +
            "id=" + getId() +
            ", indirizzo='" + getIndirizzo() + "'" +
            ", citta='" + getCitta() + "'" +
            ", provincia='" + getProvincia() + "'" +
            ", cap='" + getCap() + "'" +
            ", regione='" + getRegione() + "'" +
            "}";
    }
}
