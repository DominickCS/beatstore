package com.dominickcs.beatstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dominickcs.beatstore.entity.Beat;

@Repository
public interface BeatRepository extends JpaRepository<Beat, Long> {

}
