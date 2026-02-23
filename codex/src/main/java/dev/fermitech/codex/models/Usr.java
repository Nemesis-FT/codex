package dev.fermitech.codex.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

/**
 * $table.getTableComment()
 */
@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "usr")
public class Usr extends BaseDAO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ext_id")
    private String extId;

    @Column(name = "username")
    private String username;

    @Column(name = "fl_admin")
    private Boolean flAdmin;

}
