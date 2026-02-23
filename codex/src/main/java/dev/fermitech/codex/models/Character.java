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
@Table(name = "character")
public class Character extends BaseDAO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "race")
    private String race;

    @Column(name = "backstory")
    private String backstory;

    @Column(name = "dob")
    private Long dob;

    @Column(name = "dod")
    private Long dod;

    @Column(name = "usr_id")
    private Long usrId;

    @Column(name = "ext_char_id")
    private Long extCharId;

}
