import Header from '@components/header';
import { User } from '@types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AddClassroomForm from '@components/classroom/AddClassroomForm';

const ClassroomPage: React.FC = () => {
  const { t } = useTranslation();
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <p>{t('general.loading')}</p>;
  }

  if (!loggedInUser || loggedInUser.role !== 'admin') {
    return (
      <>
        <Head>
          <title>{t('classroom.title')}</title>
        </Head>
        <Header />
        <main className="p-6 min-h-screen flex flex-col items-center">
          <p className="text-red-600 mt-4">{t('classroom.noAccess')}</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{t('classroom.title')}</title>
      </Head>
      <Header />
    <AddClassroomForm />
    </>
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});

export default ClassroomPage;
