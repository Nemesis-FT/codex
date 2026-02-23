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
@Table(name = "char_j_char")
public class CharJChar extends BaseDAO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "left_char_id")
    private Long leftCharId;

    @Column(name = "right_char_id")
    private Long rightCharId;

    @Column(name = "kind")
    private String kind;

}
