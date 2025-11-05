import PartyFormModal from './PartyFormModal';
import { partyFields, partyRoutes } from './partyConfig.jsx';

export default function PartyModal({ isOpen, onClose, mode, entity }) {
    const getTitle = () => {
        switch (mode) {
            case 'create': return 'Add New Party';
            case 'edit': return 'Edit Party';
            case 'delete': return 'Delete Party';
            default: return 'Party';
        }
    };

    const routes = {
        store: route(partyRoutes.store),
        update: route(partyRoutes.update, ':id'),
        destroy: route(partyRoutes.destroy, ':id'),
    };

    return (
        <PartyFormModal
            isOpen={isOpen}
            onClose={onClose}
            mode={mode}
            title={getTitle()}
            entity={entity}
            fields={partyFields}
            routes={routes}
            entityName="Party"
        />
    );
}