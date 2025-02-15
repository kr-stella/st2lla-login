FROM openjdk:17-jdk-alpine
COPY build/libs/*.jar app.jar

# --interval=30s >>> 30초마다 실행
# --timeout=30s >>> 30초동안 응답대기
# --start-period=10s >>> 컨테이너가 시작된 후 10초 동안은 실패 상태를 무시
# --retries=3 >>> 3회 연속 실패 시, 컨테이너를 UnHealthy상태로 표시
# HEALTHCHECK --interval=30s --timeout=30s --start-period=10s --retries=3 \
#   CMD curl -f http://localhost:8080/docker/health || exit 1

ENTRYPOINT ["java", "-jar", "/app.jar"]