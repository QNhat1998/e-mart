import Link from 'next/link';
import React from 'react';
import { ClerkLoaded, SignedIn, UserButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import Container from './container';
import { getAllCategories, getMyOrders } from '@/sanity/helpers';
import Menu from '../menu';
import Logo from '../logo';
import { ListOrdered } from 'lucide-react';
import CartIcon from '../cart-icon';
import MobileMenu from '../mobile-menu';
import SearchBar from '../search-bar';

const Header = async () => {
  const user = await currentUser();
  const { userId } = await auth();
  let orders = null;
  if (userId) {
    orders = await getMyOrders(userId);
  }
  const categories = await getAllCategories(3);

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-b-gray-200 py-5">
      <Container className="flex items-center justify-between gap-7 text-lightColor">
        <Menu categories={categories} />
        <div className="w-auto md:w-1/3 flex items-center justify-center gap-2.5">
          <MobileMenu categories={categories} />
          <Logo>E-mart</Logo>
        </div>
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <SignedIn>
            <Link href={'/orders'} className="group relative">
              <ListOrdered className="group-hover:text-darkColor hoverEffect" />
              <span className="absolute -top-1 -right-1 bg-darkColor text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                {orders?.length ? orders?.length : 0}
              </span>
            </Link>
          </SignedIn>
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {!user && (
              <Link
                href="/signin"
                className="text-sm font-semibold hover:text-darkColor hoverEffect"
              >
                Login
              </Link>
            )}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
