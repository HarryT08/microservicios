FROM openjdk:8-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} userProfile-2.7.9.jar
ENTRYPOINT ["java", "-jar", "/userProfile-2.7.9.jar"]