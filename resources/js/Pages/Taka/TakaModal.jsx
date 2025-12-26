import TakaFormModal from './TakaFormModal';
import { takaFields, takaRoutes } from './takaConfig.jsx';

export default function TakaModal({ isOpen, onClose, mode, entity }) {
    const getTitle = () => {
        switch (mode) {
            case 'create': return 'Add New Taka';
            case 'edit': return 'Edit Taka';
            case 'delete': return 'Delete Taka';
            default: return 'Taka';
        }
    };

    const routes = {
        store: route(takaRoutes.store),
        update: route(takaRoutes.update, ':id'),
        destroy: route(takaRoutes.destroy, ':id'),
    };

    return (
        <TakaFormModal
            isOpen={isOpen}
            onClose={onClose}
            mode={mode}
            title={getTitle()}
            entity={entity}
            fields={takaFields}
            routes={routes}
            entityName="Taka"
        />
    );
}