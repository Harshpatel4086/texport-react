import QualityFormModal from './QualityFormModal';
import { qualityFields, qualityRoutes } from './qualityConfig.jsx';

export default function QualityModal({ isOpen, onClose, mode, entity }) {
    const getTitle = () => {
        switch (mode) {
            case 'create': return 'Add New Quality';
            case 'edit': return 'Edit Quality';
            case 'delete': return 'Delete Quality';
            default: return 'Quality';
        }
    };

    const routes = {
        store: route(qualityRoutes.store),
        update: route(qualityRoutes.update, ':id'),
        destroy: route(qualityRoutes.destroy, ':id'),
    };

    return (
        <QualityFormModal
            isOpen={isOpen}
            onClose={onClose}
            mode={mode}
            title={getTitle()}
            entity={entity}
            fields={qualityFields}
            routes={routes}
            entityName="Quality"
        />
    );
}