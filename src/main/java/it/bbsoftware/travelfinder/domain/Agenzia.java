package it.bbsoftware.travelfinder.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Agenzia.
 */
@Entity
@Table(name = "agenzia")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Agenzia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @OneToMany(mappedBy = "agenzia")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Indirizzo> sedes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Agenzia nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Indirizzo> getSedes() {
        return sedes;
    }

    public Agenzia sedes(Set<Indirizzo> indirizzos) {
        this.sedes = indirizzos;
        return this;
    }

    public Agenzia addSede(Indirizzo indirizzo) {
        this.sedes.add(indirizzo);
        indirizzo.setAgenzia(this);
        return this;
    }

    public Agenzia removeSede(Indirizzo indirizzo) {
        this.sedes.remove(indirizzo);
        indirizzo.setAgenzia(null);
        return this;
    }

    public void setSedes(Set<Indirizzo> indirizzos) {
        this.sedes = indirizzos;
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
        Agenzia agenzia = (Agenzia) o;
        if (agenzia.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), agenzia.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Agenzia{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
