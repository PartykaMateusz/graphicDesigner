package com.graphic.designer.graphicDesigner.web.proposal.repository;

import com.graphic.designer.graphicDesigner.web.proposal.model.Proposal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProposalRepository extends JpaRepository<Proposal, Long> {

    @Query(value = "select * from proposals where order_id = :id AND is_active = true", nativeQuery = true)
    Page<Proposal> findActiveByOrder(Pageable pageable, Long id);

    @Query(value = "select * from proposals where order_id = :id AND is_active = true", nativeQuery = true)
    List<Proposal> findActiveByOrder(Long id);

    @Query(value = "select * from proposals where user_id = :userId AND is_active = true AND is_finished != true", nativeQuery = true)
    Page<Proposal> findActiveByUser(Pageable pageable, Long userId);

    @Query(value = "select * from proposals where order_id = :orderId and user_id = :userId AND is_active = true", nativeQuery = true)
    List<Proposal> findByUserAndOrder(Long userId, Long orderId);

    @Query(value = "select COUNT(proposal_id) from proposals where user_id = :id and is_active = true AND is_finished != true ", nativeQuery = true)
    Long findActiveNumberByUser(Long id);

    @Query(value = "select COUNT(proposal_id) from proposals where user_id = :id and is_active = true", nativeQuery = true)
    Long findAllNumberByUser(Long id);


}
