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
@Table(name = "char_hist")
public class CharHist extends BaseDAO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "char_id")
    private Long charId;

    @Column(name = "campaign_id")
    private Long campaignId;

    @Column(name = "timeframe")
    private Long timeframe;

    @Column(name = "ORDER")
    private Long order;

    @Column(name = "content")
    private String content;

}
