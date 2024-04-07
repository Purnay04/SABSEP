FROM maven:3.8.3-openjdk-17 as build

WORKDIR /workspace/app

COPY ../pom.xml .
COPY ../src src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine

COPY --from=build /workspace/app/target/*.jar /app/app.jar

EXPOSE 8080

RUN rm -f /var/app.log

RUN ls

ENTRYPOINT ["java", "-jar", "/app/app.jar"]