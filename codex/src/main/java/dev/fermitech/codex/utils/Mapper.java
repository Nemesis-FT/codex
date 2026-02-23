package dev.fermitech.codex.utils;

import dev.fermitech.codex.controllers.dto.BaseDTO;
import dev.fermitech.codex.models.BaseDAO;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public abstract class Mapper<DAO extends BaseDAO, DTO extends BaseDTO> {

    private ModelMapper mp = new ModelMapper();
    @Getter
    @Setter
    private Class<DAO> daoClass;
    @Getter
    @Setter
    private Class<DTO> dtoClass;

    public DAO toDAO(DTO dto){
        return mp.map(dto, this.getDaoClass());
    }

    public DTO toDTO(DAO dao){
        return mp.map(dao, this.getDtoClass());
    }

    public List<DTO> toDTOList(List<DAO> daos){
        return daos.stream().map(this::toDTO).toList();

    }

    public List<DAO> toDAOList(List<DTO> dtos){
        return dtos.stream().map(this::toDAO).toList();

    }

    public Page<DAO> toDAOPage(Page<DTO> dtoPage){
        return new PageImpl<DAO>(toDAOList(dtoPage.getContent()), dtoPage.getPageable(), dtoPage.getTotalElements());
    }

    public Page<DTO> toDTOPage(Page<DAO> daoPage){
        return new PageImpl<DTO>(toDTOList(daoPage.getContent()), daoPage.getPageable(), daoPage.getTotalElements());
    }
}
