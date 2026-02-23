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
@Table(name = "setting")
public class Setting extends BaseDAO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "timeframe_start")
    private Long timeframeStart;

    @Column(name = "timeframe_end")
    private Long timeframeEnd;

    @Column(name = "content")
    private String content;

    @Column(name = "owner_usr_id")
    private Long ownerUsrId;

    @Column(name = "world_id")
    private Long worldId;

}
