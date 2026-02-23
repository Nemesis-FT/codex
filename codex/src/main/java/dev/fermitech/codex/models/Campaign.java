package dev.fermitech.codex.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * $table.getTableComment()
 */
@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "campaign")
public class Campaign extends BaseDAO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "synopsis")
    private String synopsis;

    @Column(name = "retelling")
    private String retelling;

    @Column(name = "master_usr_id")
    private Long masterUsrId;

}
