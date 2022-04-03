package database.session;

import database.model.Point;
import database.model.User;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

import javax.ejb.Stateful;

@Stateful
public class UserHibernateSession {

    private SessionFactory sessionFactory;

    public SessionFactory getSessionFactory() {
        if (sessionFactory == null) {
            Configuration configuration = new Configuration().addAnnotatedClass(User.class).addAnnotatedClass(Point.class).configure();
            ServiceRegistry sr = new StandardServiceRegistryBuilder().applySettings(configuration.getProperties()).build();
            sessionFactory = configuration.addAnnotatedClass(User.class).addAnnotatedClass(Point.class).buildSessionFactory(sr);
        }
        return sessionFactory;
    }
}
