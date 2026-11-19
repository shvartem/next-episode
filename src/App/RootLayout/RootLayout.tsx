import {FavoritesProvider} from '~/App/FavoritesProvider/FavoritesProvider';
import {RootLayoutContent} from './RootLayoutContent/RootLayoutContent';

export const RootLayout = () => (
    <FavoritesProvider>
        <RootLayoutContent />
    </FavoritesProvider>
);
