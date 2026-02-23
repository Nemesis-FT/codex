package dev.fermitech.codex.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldNameConstants;

@Entity(name="UTENTE")
@AllArgsConstructor
@NoArgsConstructor
@Data
@FieldNameConstants
public class User extends BaseDAO {
    @Id
    @GeneratedValue
    private Long id;

    private String username;
    private String remote_uid;
}
