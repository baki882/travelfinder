package it.bbsoftware.travelfinder.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Entity
@Table(name = "indirizzo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Indirizzo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "indirizzo")
    private String indirizzo;

    @Column(name = "citta")
    private String citta;

    @Column(name = "provincia")
    private String provincia;

    @Column(name = "cap")
    private String cap;

    @Column(name = "regione")
    private String regione;

    @ManyToOne
    private Agenzia agenzia;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIndirizzo() {
        return indirizzo;
    }

    public Indirizzo indirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
        return this;
    }

    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }

    public String getCitta() {
        return citta;
    }

    public Indirizzo citta(String citta) {
        this.citta = citta;
        return this;
    }

    public void setCitta(String citta) {
        this.citta = citta;
    }

    public String getProvincia() {
        return provincia;
    }

    public Indirizzo provincia(String provincia) {
        this.provincia = provincia;
        return this;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getCap() {
        return cap;
    }

    public Indirizzo cap(String cap) {
        this.cap = cap;
        return this;
    }

    public void setCap(String cap) {
        this.cap = cap;
    }

    public String getRegione() {
        return regione;
    }

    public Indirizzo regione(String regione) {
        this.regione = regione;
        return this;
    }

    public void setRegione(String regione) {
        this.regione = regione;
    }

    public Agenzia getAgenzia() {
        return agenzia;
    }

    public Indirizzo agenzia(Agenzia agenzia) {
        this.agenzia = agenzia;
        return this;
    }

    public void setAgenzia(Agenzia agenzia) {
        this.agenzia = agenzia;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Indirizzo indirizzo = (Indirizzo) o;
        if (indirizzo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), indirizzo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Indirizzo{" +
            "id=" + getId() +
            ", indirizzo='" + getIndirizzo() + "'" +
            ", citta='" + getCitta() + "'" +
            ", provincia='" + getProvincia() + "'" +
            ", cap='" + getCap() + "'" +
            ", regione='" + getRegione() + "'" +
            "}";
    }
}
