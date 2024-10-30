package com.peter.triangle.model;

import jakarta.persistence.*;

import java.awt.*;
import java.util.UUID;

@Entity
@Table(name = "restaurant")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "rid")
    private UUID rid;

    @Column(name = "m_id")
    private int m_id;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "city")
    private String city;

    @Column(name = "province")
    private String province;

    @Column(name = "country")
    private String country;

    @Column(name = "postal_code")
    private String postal_code;


    public UUID getRid() {
        return rid;
    }

    public int getM_id() {
        return m_id;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public String getCity() {
        return city;
    }

    public String getProvince() {
        return province;
    }

    public String getCountry() {
        return country;
    }

    public String getPostalCode() {
        return postal_code;
    }

    public void setRid(UUID rid) {
        this.rid = rid;
    }

    public void setM_id(int m_id) {
        this.m_id = m_id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setPostalCode(String postal_code) {
        this.postal_code = postal_code;
    }
}
