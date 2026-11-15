package dev.fermitech.codex.security;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.OAuthFlow;
import io.swagger.v3.oas.models.security.OAuthFlows;
import io.swagger.v3.oas.models.security.Scopes;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Lets Swagger UI log in through AuthMaster (authorization code + PKCE) and send the resulting bearer token.
 */
@Configuration
public class OpenApiConfig {
    public static final String SECURITY_SCHEME = "authmaster";
    public static final String SCOPE = "Profile";

    @Bean
    public OpenAPI codexOpenApi(@Value("${authmaster.url}") String authmasterUrl) {
        OAuthFlow authorizationCode = new OAuthFlow()
                .authorizationUrl(authmasterUrl + "/oauth/authorize")
                .tokenUrl(authmasterUrl + "/oauth/token")
                .scopes(new Scopes().addString(SCOPE, "Access Codex with your AuthMaster account"));
        return new OpenAPI()
                .components(new Components().addSecuritySchemes(SECURITY_SCHEME, new SecurityScheme()
                        .type(SecurityScheme.Type.OAUTH2)
                        .flows(new OAuthFlows().authorizationCode(authorizationCode))))
                .addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME, List.of(SCOPE)));
    }
}
