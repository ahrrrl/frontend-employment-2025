import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="flex gap-4 p-4 border-b-2">
      <Link href="/" className="hover:text-gray-300">
        홈페이지
      </Link>
      <Link href="/sign-in" className="hover:text-gray-300">
        로그인
      </Link>
      <Link href="/sign-up" className="hover:text-gray-300">
        회원가입
      </Link>
      <Link href="/pokemons" className="hover:text-gray-300">
        포켓몬 목록
      </Link>
      <Link href="/admin" className="hover:text-gray-300">
        관리자
      </Link>
      <Link href="/admin/users" className="hover:text-gray-300">
        관리자 - 사용자 목록
      </Link>
    </nav>
  );
};

export default Navigation;
