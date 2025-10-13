# Musical Journey Dashboard

This is a small personal project I started to combine two things I care about: programming and music.  
I recently bought a MIDI keyboard (Arturia KeyLab Essential mk3) and I also play guitar.  
I wanted a simple way to keep track of what I’m learning, log my practice sessions, and store sheet music and guitar tabs in one place.

It’s a side project I’m building while learning more about full-stack development.

---

## Stack
- Frontend: React
- Backend: Spring Boot 
- Database: PostgreSQL
- Migrations: Flyway
- ORM: JPA / Hibernate
- Others: Lombok, Swagger (SpringDoc), Docker Compose

---

## Features
- Track piano and guitar practice sessions  
- Save songs or pieces with learning status  
- Upload sheet music, tabs, and MIDI files  
- Store YouTube or tutorial links  
- REST API with Swagger documentation  
- Fully dockerized setup

---

## Run Locally
1. Copy `.env.example` → `.env` and update your values  
2. Build and start the project:
   ```bash
   docker compose up --build
   ```
3. Backend: [http://localhost:8080](http://localhost:8080)  
   Swagger UI: [http://localhost:8080/swagger-ui](http://localhost:8080/swagger-ui)

4. Frontend: [http://localhost:5173](http://localhost:5173)  

---

## Why
I wanted a small, self-hosted tool to organize my music learning in one place instead of keeping everything in random folders.  
It helps me stay consistent and see my progress while I practice both guitar and piano.