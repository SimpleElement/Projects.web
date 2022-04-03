package database.dao;

import database.model.User;
import database.session.UserHibernateSession;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.hibernate.service.ServiceRegistry;

import javax.ejb.*;
import javax.persistence.PersistenceException;
import java.io.Serializable;

@Stateless
@LocalBean
public class UsersDAO implements Serializable {

    @EJB
    private UserHibernateSession uhs;

    public boolean checkUserExists(String username, String password) {
        Session session = null;
        Transaction tx1;
        try {
            session = uhs.getSessionFactory().openSession();
            tx1 = session.beginTransaction();
            Query<User> queryResult = session.createQuery("FROM User u WHERE u.username = ?1", User.class).setParameter(1, username);
            User user = queryResult.uniqueResult();
            tx1.commit();
            if (user.getPassword().equals(password)) {
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        } finally {
            session.close();
        }
    }

    public User getUser(String username) {
        Session session = null;
        Transaction tx1 = null;
        try {
            session = uhs.getSessionFactory().openSession();
            tx1 = session.beginTransaction();
            Query<User> queryResult = session.createQuery("FROM User u WHERE u.username = ?1", User.class).setParameter(1, username);
            User user = queryResult.uniqueResult();
            tx1.commit();
            return user;
        } catch (Exception e) {
            return null;
        } finally {
            session.close();
        }
    }

    public boolean registerUser(String username, String password) {
        Session session = null;
        Transaction tx1 = null;
        try {
            User user = new User();
            user.setUsername(username);
            user.setPassword(password);

            session = uhs.getSessionFactory().openSession();
            tx1 = session.beginTransaction();
            session.save(user);
            tx1.commit();
            return true;
        } catch (PersistenceException e) {
            return false;
        } finally {
            session.close();
        }
    }
}
