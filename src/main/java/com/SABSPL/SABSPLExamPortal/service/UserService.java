package com.SABSPL.SABSPLExamPortal.service;

import com.SABSPL.SABSPLExamPortal.exception.UserAlreadyExistException;
import com.SABSPL.SABSPLExamPortal.model.UserValue;
import com.SABSPL.SABSPLExamPortal.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserValue user = getUserByUserName(username);
        return new org.springframework.security.core.userdetails.User(
                username,
                user.getPassword(),
                user.getAuthorities()
        );
    }

    @Transactional
    public UserValue getUserByUserName(String username) throws UsernameNotFoundException {
        return userRepo
                .findByUserName(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not exist with " + username));
    }

    @Transactional(rollbackFor = UserAlreadyExistException.class)
    public void addUser(UserValue user) throws UserAlreadyExistException{
        if(userRepo.findByEmail(user.getEmail()).isPresent())
            throw new UserAlreadyExistException(user.getEmail());
        else if (userRepo.findByUserName(user.getUsername()).isPresent()) {
            throw new UserAlreadyExistException(user.getUsername());
        }
        userRepo.save(user);
    }
}
