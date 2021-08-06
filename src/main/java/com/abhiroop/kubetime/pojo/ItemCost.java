package com.abhiroop.kubetime.pojo;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name = "_costlist")
public class ItemCost implements Serializable {

	/**
	 
	 */
	private static final long serialVersionUID = -4881492616406082505L;

	@Id
	private long uuid;
	
	private long clusterid;
	private String currency;
	private String cpuunit;
	private String memoryunit;
	private String storageunit;
	private String timelengthunit;
	private double cpucost;
	private double momorycost;
	private double storagecost;
	private Date lastupdated;
}
