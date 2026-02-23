package dev.fermitech.codex.repositories;

import dev.fermitech.codex.models.UsrJCampaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface UsrJCampaignRepository extends JpaRepository<UsrJCampaign, Long>, JpaSpecificationExecutor<UsrJCampaign> {

}