package jj.stella;

import java.nio.file.Paths;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;
import software.amazon.awssdk.profiles.ProfileFile;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;

@SpringBootApplication
@EnableAspectJAutoProxy
public class Application extends SpringBootServletInitializer {
	
	private static final Region AWS_REGION = Region.AP_NORTHEAST_2;
	private static final String CREDENTIALS_FILE = "credentials-st2lla";
	private static final String ENVIRONMENT_PROPS_FOR_SECRET = System.getenv("ST2LLA_PROPS");
	public static void main(String[] args) throws Exception {
		
		/** 프로필 파일 경로 설정 */
		String credentialsPath = Paths.get(System.getProperty("user.home"), ".aws", CREDENTIALS_FILE).toString();
		
		/** ProfileFile 객체 생성 */
		ProfileFile profileFile = ProfileFile.builder()
			.content(Paths.get(credentialsPath))
			.type(ProfileFile.Type.CREDENTIALS)
			.build();

		/** ProfileCredentialsProvider를 사용하여 ProfileFile 설정 */
		ProfileCredentialsProvider provider = ProfileCredentialsProvider.builder()
			.profileFile(profileFile)
			.profileName("default")
			.build();
		
		/** SecretsManagerClient 객체 생성 */
		SecretsManagerClient client = SecretsManagerClient.builder()
				.region(AWS_REGION)
				.credentialsProvider(provider)
				.build();
		
		/** 위 자격 증명으로 Secrets Manager 요청 */
		GetSecretValueRequest req = GetSecretValueRequest.builder()
			.secretId(ENVIRONMENT_PROPS_FOR_SECRET)
			.build();
		
		/** 값을 가져와서 문자열 형태로 저장 */
		String value = client.getSecretValue(req).secretString();
		// GetSecretValueResponse getSecretValueResponse = client.getSecretValue(request);
		
		ObjectMapper object = new ObjectMapper();
		TypeReference<Map<String, String>> type = new TypeReference<Map<String, String>>() {};
		Map<String, String> secrets = object.readValue(value, type);
		for(Map.Entry<String, String> entry:secrets.entrySet())
			System.setProperty(entry.getKey(), entry.getValue());
		
		// 환경변수 확인하려면 주석 풀기
		// secrets.forEach((key, val) -> System.out.println("Loaded secret: " + key + " = " + val));
		System.setProperty("server.servlet.context-path", "/");
		SpringApplication.run(Application.class, args);
		
	}
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(Application.class);
	}
	
}