import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const features = [
  {
    title: 'Dynamic scaling',
    description: 'Expand or shrink your Slurm node allocation at runtime — no restart required.',
  },
  {
    title: 'Policy-driven',
    description: 'Choose a built-in reconfiguration policy or implement your own with a simple C interface.',
  },
  {
    title: 'MPI-native',
    description: 'Integrates directly with Open MPI. Your existing MPI code keeps working.',
  },
  {
    title: 'Minimal API',
    description: 'Three functions: dmr_init, dmr_check, dmr_finalize. Plus the DMR_AUTO macro.',
  },
];

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>DMR</h1>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="/getting-started/what-is-dmr">
              Get started
            </Link>
            <Link className="button button--secondary button--lg" to="https://gitlab.bsc.es/accelcom/releases/dmr/dmr">
              GitLab
            </Link>
          </div>
        </div>

        <div className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map(({title, description}) => (
                <div key={title} className="col col--3">
                  <div className={styles.featureCard}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
