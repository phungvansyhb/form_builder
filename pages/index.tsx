import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>My PetProjects</title>
                <meta name="description" content="Multip pet project to learn myself" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://gitlab.com/canteen-project/mystorybook">My repo</a>
                </h1>

                <div className={styles.grid}>
                    <Link href="/FormBuilder" passHref>
                        <div className={`${styles.card} cursor-pointer shadow-xl`}>
                            <h2>FormBuilder &rarr;</h2>
                            <code>This a project create with react-hook-form , which help user create form with custom field</code>
                        </div>
                    </Link>
                </div>
            </main>

            <footer className={styles.footer}>
                <code>Author by Phùng Văn Sỹ</code>
            </footer>
            <div>
                <table></table>
            </div>
        </div>
    );
};

export default Home;
