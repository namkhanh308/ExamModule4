package com.codegym.repository;

import com.codegym.model.National;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface INationalRepository extends JpaRepository<National, Long> {
}
