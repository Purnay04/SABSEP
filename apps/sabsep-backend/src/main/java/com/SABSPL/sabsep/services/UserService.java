package com.SABSPL.sabsep.services;

import com.SABSPL.sabsep.constants.Role;
import com.SABSPL.sabsep.models.User;
import com.SABSPL.sabsep.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Data
@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService{
    private final UserRepository userRepository;

    public boolean findByEmail(String email){
        return userRepository.findByEmail(email)!=null;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(),
                true,true,true,true,getAuthorities(user.getRole()));
    }

    public User getUserByEmail(String email)throws UsernameNotFoundException{
        return userRepository.findByEmail(email);
    }

    public List<User> getAllCandidates() {
        return userRepository.findAllByRole(Role.ROLE_USER);
    }

    private Collection<? extends GrantedAuthority> getAuthorities(String role_user) {
        return Collections.singletonList(new SimpleGrantedAuthority(role_user));
    }

    public void save(User user){
        userRepository.save(user);
    }
}
