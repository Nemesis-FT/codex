package dev.fermitech.codex.security;

import dev.fermitech.codex.models.Usr;
import dev.fermitech.codex.services.UserService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.DefaultOAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.server.resource.introspection.BadOpaqueTokenException;
import org.springframework.security.oauth2.core.OAuth2TokenIntrospectionClaimNames;
import org.springframework.security.oauth2.server.resource.introspection.OpaqueTokenIntrospector;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 * Validates bearer tokens against AuthMaster's introspection endpoint and links the
 * AuthMaster user (the {@code sub} claim) to a local {@link Usr}, creating it on first access.
 */
public class AuthMasterTokenIntrospector implements OpaqueTokenIntrospector {
    public static final String USR_ID_ATTRIBUTE = "usr_id";

    private final OpaqueTokenIntrospector delegate;
    private final UserService userService;

    public AuthMasterTokenIntrospector(OpaqueTokenIntrospector delegate, UserService userService) {
        this.delegate = delegate;
        this.userService = userService;
    }

    @Override
    public OAuth2AuthenticatedPrincipal introspect(String token) {
        OAuth2AuthenticatedPrincipal principal = delegate.introspect(token);
        String sub = principal.getAttribute(OAuth2TokenIntrospectionClaimNames.SUB);
        if (sub == null) {
            throw new BadOpaqueTokenException("Token is not bound to a user");
        }
        Usr usr = userService.provision(sub, principal.getAttribute(OAuth2TokenIntrospectionClaimNames.USERNAME));

        Map<String, Object> attributes = new HashMap<>(principal.getAttributes());
        attributes.put(USR_ID_ATTRIBUTE, usr.getId());

        Collection<GrantedAuthority> authorities = new ArrayList<>(principal.getAuthorities());
        if (Boolean.TRUE.equals(usr.getFlAdmin())) {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }
        return new DefaultOAuth2AuthenticatedPrincipal(sub, attributes, authorities);
    }
}
